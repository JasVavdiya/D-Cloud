// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract DStorage {
    //name
    string public name = "D-Cloud";

    // Number of files
    uint public fileCount = 0;
    // Mapping fileId=>Struct
    mapping(uint256 => File) public files;

    // Struct
    struct File {
        uint256 fileId;
        string fileHash;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint256 uploadTime;
        address payable uploader;
    }

    // Event
    event FileCreated(
        uint256 fileId,
        string fileHash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint256 uploadTime,
        address payable uploader
    );

    constructor() public {
    }

    // Upload File function
    function uploadFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {

    require(bytes(_fileHash).length > 0);
    require(_fileSize > 0);
    require(bytes(_fileType).length > 0);
    require(bytes(_fileName).length > 0);
    require(bytes(_fileDescription).length > 0);
    require(msg.sender!=address(0x0));

      fileCount++;

      files[fileCount] = File(fileCount, _fileHash, _fileSize, _fileType , _fileName, _fileDescription, block.timestamp , msg.sender);

      emit FileCreated(fileCount, _fileHash, _fileSize, _fileType , _fileName, _fileDescription, block.timestamp , msg.sender);

    }
}
