import { promises as fs } from 'fs';
import path from 'path';

class BackupService {
  constructor(backupDir = 'backups') {
    this.backupDir = backupDir;
    this.ensureBackupDirectory();
  }

  async ensureBackupDirectory() {
    try {
      await fs.mkdir(this.backupDir, { recursive: true });
    } catch (error) {
      console.error('Error creating backup directory:', error);
      throw error;
    }
  }

  async createBackup(data, type = 'manual') {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${type}_backup_${timestamp}.json`;
      const backupPath = path.join(this.backupDir, filename);

      // Add metadata to the backup
      const backupData = {
        metadata: {
          timestamp: new Date().toISOString(),
          type,
          version: process.env.REACT_APP_VERSION || '1.0.0',
        },
        data
      };

      await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2));
      console.log(`Backup created successfully: ${filename}`);
      return filename;
    } catch (error) {
      console.error('Error creating backup:', error);
      throw error;
    }
  }

  async restoreFromBackup(filename) {
    try {
      const backupPath = path.join(this.backupDir, filename);
      const backupContent = await fs.readFile(backupPath, 'utf-8');
      const backupData = JSON.parse(backupContent);

      // Verify backup metadata
      if (!backupData.metadata || !backupData.data) {
        throw new Error('Invalid backup file format');
      }

      // Version compatibility check
      const currentVersion = process.env.REACT_APP_VERSION || '1.0.0';
      if (backupData.metadata.version !== currentVersion) {
        console.warn('Warning: Backup version mismatch. Some features may not work correctly.');
      }

      return backupData.data;
    } catch (error) {
      console.error('Error restoring from backup:', error);
      throw error;
    }
  }

  async listBackups() {
    try {
      const files = await fs.readdir(this.backupDir);
      const backups = await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(async file => {
            const stats = await fs.stat(path.join(this.backupDir, file));
            return {
              filename: file,
              createdAt: stats.birthtime,
              size: stats.size
            };
          })
      );

      return backups.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Error listing backups:', error);
      throw error;
    }
  }

  async deleteBackup(filename) {
    try {
      const backupPath = path.join(this.backupDir, filename);
      await fs.unlink(backupPath);
      console.log(`Backup deleted successfully: ${filename}`);
    } catch (error) {
      console.error('Error deleting backup:', error);
      throw error;
    }
  }

  async scheduleAutomaticBackup(data, interval = 24 * 60 * 60 * 1000) { // Default: daily
    setInterval(async () => {
      try {
        await this.createBackup(data, 'automatic');
        console.log('Automatic backup completed');

        // Clean up old automatic backups (keep last 7 days)
        const backups = await this.listBackups();
        const autoBackups = backups.filter(b => b.filename.startsWith('automatic_'));
        const oldBackups = autoBackups.slice(7);

        for (const backup of oldBackups) {
          await this.deleteBackup(backup.filename);
        }
      } catch (error) {
        console.error('Error in automatic backup:', error);
      }
    }, interval);
  }
}

export default BackupService;
