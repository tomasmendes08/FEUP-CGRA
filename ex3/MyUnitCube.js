/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.slices = 4;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0.5, -0.5, 0.5,		//0
			0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,   //2
			-0.5, -0.5, 0.5,	//3
			0.5, 0.5, 0.5,		//4
			0.5, 0.5, -0.5, 	//5
			-0.5, 0.5, -0.5,    //6
			-0.5, 0.5, 0.5,	    //7

			0.5, -0.5, 0.5,		//8
			0.5, -0.5, -0.5,	//9
			-0.5, -0.5, -0.5,   //10
			-0.5, -0.5, 0.5,	//11
			0.5, 0.5, 0.5,		//12
			0.5, 0.5, -0.5, 	//13
			-0.5, 0.5, -0.5,    //14
			-0.5, 0.5, 0.5,	    //15

			0.5, -0.5, 0.5,		//16
			0.5, -0.5, -0.5,	//17
			-0.5, -0.5, -0.5,   //18
			-0.5, -0.5, 0.5,	//19
			0.5, 0.5, 0.5,		//20
			0.5, 0.5, -0.5, 	//21
			-0.5, 0.5, -0.5,    //22
			-0.5, 0.5, 0.5	    //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			// Bottom
			0, 2, 1,
			0, 3, 2,
			// Top
			4, 5, 6,
			4, 6, 7
		];

		this.normals = [
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0
		];

		for (var i = 0; i < this.slices; i++) {
			this.indices.push(i);
			this.indices.push((i+1)%this.slices);
			this.indices.push(i+this.slices);

			this.indices.push((i+1)%this.slices);
			this.indices.push((i+1)%this.slices+this.slices);
			this.indices.push(i+this.slices);
		}

		// for (var k = 0; k < 3; k++) {
		// 	for (var j = 0; j < 8; j++) {
		// 		switch (k) {
		// 			case 0:
		// 				this.normals.push(0);
		// 				this.normals.push(-1+(2*(j/this.slices)));
		// 				this.normals.push(0);
		// 				break;
		
		// 			case 1:
		// 				this.normals.push(0);
		// 				this.normals.push(0);
		// 				this.normals.push(1-(2*((j+1)%2)));
		// 				break;
		
		// 			case 2:
		// 				this.normals.push(1-(2*(j/2)%2));
		// 				this.normals.push(0);
		// 				this.normals.push(0);
		// 				break;
		// 		}
		// 	}
		// }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
