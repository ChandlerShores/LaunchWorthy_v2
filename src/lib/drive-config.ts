export const getDriveConfig = () => {
  const required = [
    'GCP_PROJECT_ID',
    'GCP_PROJECT_NUMBER', 
    'GCP_SERVICE_ACCOUNT_EMAIL',
    'GCP_WORKLOAD_IDENTITY_POOL_ID',
    'GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID',
    'GOOGLE_DRIVE_FOLDER_ID'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    projectId: process.env.GCP_PROJECT_ID!,
    projectNumber: process.env.GCP_PROJECT_NUMBER!,
    serviceAccountEmail: process.env.GCP_SERVICE_ACCOUNT_EMAIL!,
    workloadIdentityPoolId: process.env.GCP_WORKLOAD_IDENTITY_POOL_ID!,
    workloadIdentityProviderId: process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID!,
    driveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID!
  };
};
