import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if the file is an image
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File must be an image (JPEG, PNG, GIF, or WEBP)' },
        { status: 400 }
      );
    }

    // Maximum file size of 5MB
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Create unique filename
    const fileExtension = file.type.split('/')[1];
    const fileName = `${uuidv4()}.${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'Images', 'blog-uploads');
    const filePath = `/Images/blog-uploads/${fileName}`;
    const absolutePath = path.join(uploadDir, fileName);

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Get file data as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Process and save image using sharp
    await sharp(buffer)
      .toFile(absolutePath);

    // Return the file path to be used in the blog post
    return NextResponse.json({ 
      filePath,
      success: true 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 