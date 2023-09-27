#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

void main() {
	if (coords.y > 0.5)
		gl_FragColor.rgba = vec4(0.9, 0.9, 0, 1.0);
	else {
		gl_FragColor.rgba = vec4(0.6,0.6,0.9, 1.0);
	}
}
