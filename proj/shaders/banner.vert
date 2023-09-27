attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float phase;
uniform bool isInverted;

varying vec2 vTextureCoord;

void main() {

    vec3 offset = vec3(0.0, 0.0, 0.0);

	if (isInverted)
		offset.z = 0.1 * sin(aVertexPosition.x * 10.0 - phase * 2.0);
	else
		offset.z = 0.1 * sin(aVertexPosition.x * 10.0 + phase * 2.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;
}
