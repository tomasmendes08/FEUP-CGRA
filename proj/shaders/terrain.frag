#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerTerrain;

void main() {

	vec4 color = texture2D(uSamplerTerrain, vTextureCoord);

	gl_FragColor = color;
}
