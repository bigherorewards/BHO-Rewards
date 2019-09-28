import com.big-hero-rewards.CameraModule;

protected List<ReactPackage> getPackages() {
  @SuppressWarnings("UnnecessaryLocalVariable")
  List<ReactPackage> pkgs = new PackageList(this).getPackages();

  pkgs.add(new CameraModule());

  return pkgs
}