// Vertex Shader 頂点シェーダー
// 頂点座標を計算する 3つの頂点が決まると面が決まる

// fragmentShaderに渡すためのvarying変数
varying vec2 vUv;

// メイン関数
void main() {
  // 処理する頂点ごとのuv(テクスチャ)座標をそのままfragmentShaderに渡す
  vUv = uv;

  // gl_Position 頂点シェーダーの座標
  // position 頂点座標 threejs で定義されている
  // vec4 4つのベクトル（RGBA）
  gl_Position = vec4(position, 1.0);
}