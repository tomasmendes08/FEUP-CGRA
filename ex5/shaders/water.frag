#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerWater;
uniform float timeFactor;

void main() {

	vec4 color = texture2D(uSamplerWater, vec2(timeFactor * 0.02, timeFactor * 0.02) + vTextureCoord);

	gl_FragColor = color;

    if (color.b * 0.04 < 0.01)
        gl_FragColor.rgb /= 1.1 + color.b * 0.04;
}
