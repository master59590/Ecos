const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"), // ✅ รองรับ SVG
  };

  config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"), // ลบ 'svg' ออกจาก assetExts
    sourceExts: [...config.resolver.sourceExts, "svg", "cjs"], // ✅ เพิ่ม 'svg' และ 'cjs' ใน sourceExts
  };

  return config;
})();
