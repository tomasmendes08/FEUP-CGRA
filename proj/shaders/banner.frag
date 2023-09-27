#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerBanner;

void main() {

	vec4 color = texture2D(uSamplerBanner, vTextureCoord);

	gl_FragColor = color;
}
