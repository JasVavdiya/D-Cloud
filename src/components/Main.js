import React, { Component } from "react";
import { convertBytes } from "./helpers";
import moment from "moment";
import Identicon from "identicon.js";
import noPreview from "/Users/jashvavadiya/D-Cloud/src/noPreview.png";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "1239px" }}
          >
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <div
                className="mb-3 mx-auto "
                style={{
                  maxWidth: "512px",
                  borderRadius: "10px",
                  background: "rgb(248 235 233)",
                  padding: "20px",
                  border: "2px solid rgb(237 224 222)",
                }}
              >
                <h2>
                  <b>Share File</b>
                </h2>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const description = this.fileDescription.value;
                    this.props.uploadFile(description);
                  }}
                >
                  <div className="form-group">
                    <br></br>
                    <input
                      id="fileDescription"
                      type="text"
                      ref={(input) => {
                        this.fileDescription = input;
                      }}
                      className="form-control"
                      placeholder="description..."
                      required
                    />
                  </div>
                  <input
                    type="file"
                    onChange={this.props.captureFile}
                    className=""
                  />
                  <button
                    type="submit"
                    style={{
                      background: "#f39f0e",
                      border: "1px solid #563c2a",
                    }}
                    className="btn-block my-3"
                  >
                    <b>Upload!</b>
                  </button>
                </form>
              </div>
              <p>&nbsp;</p>

              <div
                className="grid-container"
                style={{
                  display: "grid",
                  gridGap: "20px",
                  gridTemplateColumns: "auto auto auto auto",
                }}
              >
                {this.props.files.map((file, key) => {
                  return (
                    <div>
                      <div
                        className="grid-item"
                        key={key}
                        style={{ width: "18rem" }}
                      >
                        <div className="d-flex justify-content-start  overflow-auto">
                          <img
                            alt="icon"
                            className="mr-2"
                            width="20"
                            height="20"
                            src={`data:image/png;base64,${new Identicon(
                              file.uploader,
                              30
                            ).toString()}`}
                          />
                          <a
                            href={
                              "https://etherscan.io/address/" + file.uploader
                            }
                            rel="noopener noreferrer"
                            target="_blank"
                            style={{ fontSize: "14px" }}
                          >
                            {file.uploader}
                          </a>
                        </div>
                        <hr></hr>
                        <div>
                          {file.fileType.startsWith("image/") ? (
                            <img
                              className="card-img-top"
                              src={
                                "https://ipfs.infura.io/ipfs/" + file.fileHash
                              }
                              alt="Cardimagecap"
                            />
                          ) : file.fileType.startsWith("video/") ? (
                            <video
                              className="card-img-top"
                              controls
                              src={
                                "https://ipfs.infura.io/ipfs/" + file.fileHash
                              }
                            />
                          ) : (
                            <img
                              className="card-img-top"
                              src={noPreview}
                              alt="Cardimagecap"
                            />
                          )}
                        </div>
                        <h5>{file.fileDescription}</h5>
                        <hr style={{ margin: "0px" }}></hr>
                        <div>
                          <h6 style={{ fontSize: "12px", marginTop: "5px" }}>
                            {moment
                              .unix(file.uploadTime)
                              .format("h:mm:ss A M/D/Y")}
                          </h6>
                          <h6 style={{ fontSize: "12px", marginTop: "5px" }}>
                            {convertBytes(file.fileSize)}
                          </h6>
                          <div style={{ fontSize: "12px" }}>
                            <a
                              href={
                                "https://ipfs.infura.io/ipfs/" + file.fileHash
                              }
                              rel="noopener noreferrer"
                              style={{ fontSize: "12px", marginTop: "-10px" }}
                              target="_blank"
                            >
                              Full preview : {file.fileHash.substring(0, 10)}...
                            </a>
                            <h6 style={{ fontSize: "12px" }}>
                              {file.fileType}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
