#ifdef GL_ES
precision highp float;
#endif

varying vec3 vVertexPosition;

uniform float nSuppliesDelivered;

void main() {

	vec4 color = vec4(-vVertexPosition.x + 0.5, vVertexPosition.x + 0.5, 0.0, 1.0);

	vec4 grey = vec4(0.5, 0.5, 0.5, 1.0);

	float cutoff = nSuppliesDelivered / 5.0;

	if (vVertexPosition.x + 0.5 < cutoff)
		gl_FragColor = color;
	else
		gl_FragColor = grey;
}
