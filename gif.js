const raw = `![celeb1](https://user-images.githubusercontent.com/50317129/121762015-6bc75a00-cb6e-11eb-943d-74cba1a579dd.gif)
![celeb2](https://user-images.githubusercontent.com/50317129/121762018-6d911d80-cb6e-11eb-8e6f-1a6c2fabc683.gif)
![celeb3](https://user-images.githubusercontent.com/50317129/121762021-708c0e00-cb6e-11eb-8eb2-24691626ee14.gif)
![celeb4](https://user-images.githubusercontent.com/50317129/121762023-7255d180-cb6e-11eb-80de-4628681ab1cd.gif)
![celeb5](https://user-images.githubusercontent.com/50317129/121762027-7681ef00-cb6e-11eb-9427-cfcbb5ecfde4.gif)
![celeb6](https://user-images.githubusercontent.com/50317129/121762028-78e44900-cb6e-11eb-8b3c-eb1270ccb82d.gif)
![celeb7](https://user-images.githubusercontent.com/50317129/121762030-7bdf3980-cb6e-11eb-8ccc-dd78400e1c16.gif)
![celeb8](https://user-images.githubusercontent.com/50317129/121762032-7eda2a00-cb6e-11eb-87f3-8114a15d697c.gif)
![celeb9](https://user-images.githubusercontent.com/50317129/121762034-813c8400-cb6e-11eb-827a-d44096daa81a.gif)
![celeb10](https://user-images.githubusercontent.com/50317129/121762036-839ede00-cb6e-11eb-86e9-8c2fd61f57ed.gif)
![city1](https://user-images.githubusercontent.com/50317129/121762038-84d00b00-cb6e-11eb-85e3-49fbfc7917fa.gif)
![city2](https://user-images.githubusercontent.com/50317129/121762041-8ac5ec00-cb6e-11eb-9252-4e6d2263b2e0.gif)
![city3](https://user-images.githubusercontent.com/50317129/121762042-8b5e8280-cb6e-11eb-9625-959e120b83b1.gif)
![city4](https://user-images.githubusercontent.com/50317129/121762043-8bf71900-cb6e-11eb-9ca6-e5ee5defbd10.gif)
![city4](https://user-images.githubusercontent.com/50317129/121762045-8d284600-cb6e-11eb-81c0-2debbbe194bb.jpg)
![city5](https://user-images.githubusercontent.com/50317129/121762047-8dc0dc80-cb6e-11eb-8b01-062e71265eac.gif)
![city6](https://user-images.githubusercontent.com/50317129/121762050-8ef20980-cb6e-11eb-8cd0-5ca825300ac4.gif)
![city7](https://user-images.githubusercontent.com/50317129/121762051-90233680-cb6e-11eb-87c7-775aa577091f.gif)
![city8](https://user-images.githubusercontent.com/50317129/121762052-90bbcd00-cb6e-11eb-8fd2-a5a0c6d3d854.gif)
![city9](https://user-images.githubusercontent.com/50317129/121762053-91546380-cb6e-11eb-82e3-e2c9c2c5e364.gif)
![city10](https://user-images.githubusercontent.com/50317129/121762054-92859080-cb6e-11eb-8a6f-b811b156950d.gif)
![city11](https://user-images.githubusercontent.com/50317129/121762055-92859080-cb6e-11eb-8ef9-55f79f2dbc06.gif)
![city12](https://user-images.githubusercontent.com/50317129/121762057-931e2700-cb6e-11eb-8bb9-63be85da94eb.gif)
![city13](https://user-images.githubusercontent.com/50317129/121762058-93b6bd80-cb6e-11eb-99e7-2180be2edc97.gif)
![city14](https://user-images.githubusercontent.com/50317129/121762060-944f5400-cb6e-11eb-9d61-ac699d28b0c0.gif)
![code1](https://user-images.githubusercontent.com/50317129/121762061-95808100-cb6e-11eb-9044-e29e65a47fab.gif)
![code2](https://user-images.githubusercontent.com/50317129/121762062-96b1ae00-cb6e-11eb-84be-b5e79ef37eed.gif)
![code3](https://user-images.githubusercontent.com/50317129/121762064-9a453500-cb6e-11eb-9da1-44261b082d1a.gif)
![funk1](https://user-images.githubusercontent.com/50317129/121762066-9addcb80-cb6e-11eb-9938-ba43113d4183.gif)
![funk2](https://user-images.githubusercontent.com/50317129/121762067-9b766200-cb6e-11eb-864c-2aae0be0a48a.gif)
![funk3](https://user-images.githubusercontent.com/50317129/121762068-9c0ef880-cb6e-11eb-98b0-1e7d15c71171.gif)
![funk4](https://user-images.githubusercontent.com/50317129/121762072-9f09e900-cb6e-11eb-8399-e0dc9603056a.gif)
![funk5](https://user-images.githubusercontent.com/50317129/121762073-9fa27f80-cb6e-11eb-9b84-20b116fe52e1.gif)
![funk6](https://user-images.githubusercontent.com/50317129/121762076-a3360680-cb6e-11eb-94f4-762b46979465.gif)
![game1](https://user-images.githubusercontent.com/50317129/121762077-a3ce9d00-cb6e-11eb-9b0b-142801adf73e.gif)
![signal](https://user-images.githubusercontent.com/50317129/121762082-a630f700-cb6e-11eb-9ca3-f618798e091b.gif)`;

const gifs = raw.split("\n");

const regex = /\!\[(.*)\]\((.*)\)/;

const list = gifs.map(e =>
{
	const snippet = regex.exec(e);

	return {
		title: snippet[1],
		images: snippet[2]
	};
});

console.log(list);