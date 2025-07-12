const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async(file , folder , height , quality)=>{
  const options = {folder};
  
  if (file.mimetype.startsWith('video')) {
    options.resource_type = 'video';  // explicitly set resource_type to 'video' for video files
  } else {
    options.resource_type = 'image';  // default to 'image' for other file types (optional)
  }

  if(height){
    options.height = height;
  }
  if(quality){
    options.quality= quality;
  }
  options.resourse_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);

}