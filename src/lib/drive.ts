import { google } from 'googleapis';
import { getDriveConfig } from './drive-config';

let driveClient: any = null;

export const getDriveClient = async () => {
  if (driveClient) return driveClient;

  try {
    const config = getDriveConfig();
    
    // Check if we have a service account key in environment variables
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      // Use service account key from environment variable
      const credentials = JSON.parse(serviceAccountKey);
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.file']
      });
      driveClient = google.drive({ version: 'v3', auth });
    } else {
      // Fallback to Application Default Credentials
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive.file'],
        projectId: config.projectId
      });
      driveClient = google.drive({ version: 'v3', auth });
    }
    
    // Test the connection
    await driveClient.files.list({ pageSize: 1 });
    
    return driveClient;
  } catch (error) {
    console.error('Failed to initialize Drive client:', error);
    console.error('Drive config:', {
      projectId: config.projectId,
      projectNumber: config.projectNumber,
      serviceAccountEmail: config.serviceAccountEmail,
      workloadIdentityPoolId: config.workloadIdentityPoolId,
      workloadIdentityProviderId: config.workloadIdentityProviderId,
      driveFolderId: config.driveFolderId
    });
    throw new Error(`Drive service unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createBookingFolder = async (folderName: string) => {
  const drive = await getDriveClient();
  const config = getDriveConfig();
  
  const response = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [config.driveFolderId]
    }
  });

  return response.data.id!;
};

export const uploadFileToDrive = async (fileName: string, fileBuffer: Buffer, mimeType: string, parentFolderId: string) => {
  const drive = await getDriveClient();
  
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [parentFolderId]
    },
    media: {
      mimeType: mimeType,
      body: fileBuffer
    }
  });

  return response.data.id!;
};
