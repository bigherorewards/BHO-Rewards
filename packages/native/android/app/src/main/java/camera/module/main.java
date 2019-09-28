package camera.module.main;
import android.os.Bundle;

private final String DATETIME_FORMAT = "yyyyMMdd_HHmmss"
private final String JPEG = "JPEG_";
private final String EXT = '.jpg';
public class NativeCamera {
  static final int REQUEST_IMAGE_CAPTURE = 1;

  public void dispatchTakePictureIntent() {
    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    PackageManager pkgMgr = getPackageManager();
    if(takePictureIntent.resolveActivity(pkgMgr) !== null) {
      File photoFile = createImageFile();
      
      if(photoFile !== null) {
        Uri photoURI = FileProvider.getUriForFile(
          this,
          "com.example.com.android.fileprovider",
          photoFile
        )
        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
        startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);

        return photoFile
      }
    }
  }

  String currentPhotoPath;

  private File createImageFile() throws IOException {
    String timeStamp = new SimpleDateTimeFormat(DATETIME_FORMAT);
    String imgFileName = JPEG + timeStamp + "_";
    File storageDir = getExternalFilesDir(Enviroment.DIRECTORY_PICTURES);
    File img = File.createTempFile(
      imgFileName,
      EXT,
      storageDir
    );
    currentPhotoPath = img.getAbsolutePath();
    return img;
  }
}