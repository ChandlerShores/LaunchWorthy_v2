import { NextRequest, NextResponse } from 'next/server';
import { getDriveClient, createBookingFolder, uploadFileToDrive } from '@/lib/drive';
import { getDriveConfig } from '@/lib/drive-config';

interface UploadRequest {
  files: Array<{
    name: string;
    content: string; // base64 encoded
    mimeType: string;
  }>;
  bookingData: {
    contactName: string;
    email: string;
    serviceName: string;
    paymentSessionId: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { files, bookingData }: UploadRequest = await request.json();
    
    if (!files || files.length === 0) {
      return NextResponse.json({ success: true, message: 'No files to upload' });
    }

    // Create booking folder with timestamp and sanitized name
    const timestamp = new Date().toISOString().split('T')[0];
    const sanitizedName = bookingData.contactName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-');
    const sanitizedService = bookingData.serviceName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-');
    const folderName = `${timestamp}_${sanitizedName}_${sanitizedService}`;
    
    const folderId = await createBookingFolder(folderName);
    const uploadResults = [];

    // Upload each file
    for (const file of files) {
      try {
        const buffer = Buffer.from(file.content, 'base64');
        const fileId = await uploadFileToDrive(file.name, buffer, file.mimeType, folderId);

        uploadResults.push({
          name: file.name,
          success: true,
          fileId: fileId
        });
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        uploadResults.push({
          name: file.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Create booking metadata file
    try {
      const metadata = {
        contactName: bookingData.contactName,
        email: bookingData.email,
        serviceName: bookingData.serviceName,
        paymentSessionId: bookingData.paymentSessionId,
        uploadedAt: new Date().toISOString(),
        files: uploadResults
      };

      const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
      await uploadFileToDrive('booking-metadata.json', metadataBuffer, 'application/json', folderId);
    } catch (error) {
      console.error('Failed to create metadata file:', error);
      // Don't fail the whole operation for metadata
    }

    const successCount = uploadResults.filter(r => r.success).length;
    const totalCount = uploadResults.length;

    return NextResponse.json({
      success: successCount > 0,
      message: `Uploaded ${successCount}/${totalCount} files successfully`,
      results: uploadResults,
      folderId,
      folderName
    });

  } catch (error) {
    console.error('Drive upload API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload files to Drive',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
