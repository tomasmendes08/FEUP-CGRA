attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSamplerWaterMap;

void main() {

    vec4 filter = texture2D(uSamplerWaterMap, vec2(timeFactor * 0.02, timeFactor * 0.02) + aTextureCoord);
    float offset = filter.b * 0.04;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy, aVertexPosition.z + offset, 1.0);

	vTextureCoord = aTextureCoord;
}
