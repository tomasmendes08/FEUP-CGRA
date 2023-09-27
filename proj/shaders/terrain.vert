attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSamplerHeightMap;

void main() {

    vec3 offset = vec3(0.0, 0.0, 0.0);
    vec4 filter = texture2D(uSamplerHeightMap, aTextureCoord);

    offset.z = filter.b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset*8.0, 1.0);

	vTextureCoord = aTextureCoord;
}
