import React, { Component, useState } from 'react'; 
import { fileupload } from './components/UserFunctions'
import axios from 'axios'
    
console.log('ImageToText')
class ImageToText extends Component {
    /* constructor(props) {
        super(props)
        this.state = {
            file: null,
            fileToBeSent: null
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }
    
    upload(e) {
        const token = localStorage.usertoken
        // const formData = { image: this.state.file, token: token }

        // fileupload(formData);
        let file = this.state.fileToBeSent; 
        const formData = new FormData();

        formData.append("file", file);
        axios
            .post("upload", formData)
            .then(res => console.log(res))
            .catch(err => console.warn(err));


    } 
    
    

     */
    /* render() {
        return (
            <div className="container">
                <div className="mt-5">
                    <div className="col-sm-8 mx-auto">
                        <div className='row'>
                            <div className='col-6'>
                                <img width='200' height='200' src='https://www.perkinselearning.org/sites/elearning.perkinsdev1.org/files/styles/interior_page_image__519x374_/public/alt%20text.jpg?itok=JTk6uicH'></img>
                            </div>
                            <div className='col-6'>
                            <textarea style={{height: '200px', width: '200px',}} >HOW TO WRITE ALT
                                TEXT AND IMAGE DESCRIPTIONS FOR THE VISUALLY
                                IMPAIRED</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } */

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            filePath: null,
            fileToBeSent: null,
        }

        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
        // ev.preventDefault();

        console.log(this.uploadInput.files[0]['name'])
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.uploadInput.files[0]['name']);
        data.append('token', localStorage.usertoken);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                
                this.setState({ filePath: body.filename, imgextracttext: body.img_text });
                const element = document.createElement("a");
                const file = new Blob([document.getElementById('converted_text').value], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = "imageText.txt";
                element.className = "btn"; 
                document.getElementById('export_btn').appendChild(element);
            });
        });
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        })
        this.handleUploadImage()
    }

    
    render() {
        let imgPreview;
        if (this.state.filePath) {
            // imgPreview = <img height="250" src={require('./' + this.state.filePath)} alt='' />;
            return (
                <div className="mt-5 row">
                    <div className='col-6'>
                        <img height="250" src={require('/home/naveen/development/python/React-Flask-MongoDB-Login/' + this.state.filePath)} alt='' />
                        {/* <img height="250" src={'http://localhost/zdemo/fileupload/'+this.state.filePath} alt='' /> */}
                    </div>
                    <div className='col-6'>
                        <textarea style="width:550px;height:450px" id='converted_text'>{this.state.imgextracttext.replace("\\n", "<br/>")}</textarea>
                    </div>
                    <div className='col-12' id='export_btn'>
                    </div>
                </div>

            )
        }
        else
        {
            if (this.state.file) {
                imgPreview = <img height="250" src={this.state.file} alt='' />;
            }
            return (
                // <form className='mx-auto'  >

                <div className="mt-5 row">
                    <div className="col-6 custom-file">
                        <input type="file" ref={(ref) => { this.uploadInput = ref; }} className="custom-file-input" onChange={this.uploadSingleFile} />
                        <label class="custom-file-label" for="customFile">Choose file</label>
                        <div className='mt-5 row'>
                            <div className='col-12 text-center'>
                                <button className='btn btn-primary' onChange={this.handleUploadImage}> upload </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 form-group preview">
                        {imgPreview}
                    </div>
                </div>
               

                // </form >
            )
        }
    }
    /* render() {
        return (
            <form onSubmit={this.handleUploadImage}>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <div>
                    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                </div>
                <br />
                <div>
                    <button>Upload</button>
                </div>
                <img src={this.state.imageURL} alt="img" />
            </form>
        );
    } */
}
export default ImageToText
