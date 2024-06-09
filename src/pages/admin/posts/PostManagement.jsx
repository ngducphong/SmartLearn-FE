import CryptoJS from 'crypto-js';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';

const StyledVideo = styled.video`
  ::-webkit-media-controls-enclosure {
    overflow: hidden;
  }

  ::-webkit-media-controls-panel {
    overflow: hidden;
  }

  width: 1000px;
`;

const encodeVideoURL = (url) => {
    return btoa(url);
};

const decodeVideoURL = (encodedURL) => {
    return atob(encodedURL);
};

const VideoPlayer = ({ encodedURL }) => {
    const videoURL = decodeVideoURL(encodedURL);

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.setAttribute('controlsList', 'nodownload');
        }
    }, []);

    return (
        <StyledVideo ref={videoRef} src={videoURL} controls type="video/mp4" />
    );
};

export default function PostManagement() {
    function decrypt(data, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var decrypted = CryptoJS.AES.decrypt(data, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    var key = "ngducphong010402"; // 16 bytes key
    var encryptedData = "ead5tkY2aEt4k6axw0eqUnLcXsAzCUytIw/4iSAYVM5LLrxEE4EP9y0UgRw9OWT4F87ETf2Tp1qrZ7o2C3b4UggwibTYAFN5NHsQGCA6wsFPuLOa12iy1ZHTKfN9jUFYlGQR7Kw00Ih5IjvikXmtIGFK6VliOnmUgKXOfi/ZOOs="; // Replace with the actual encrypted string from Java
    var decryptedData = decrypt(encryptedData, key);

    const encodedURL = encodeVideoURL(decryptedData);

    return (
        <div>
            {/*<VideoPlayer encodedURL={encodedURL} controls />*/}
           <video src="blob:https://embed.streamc.xyz/349be3c0-4b5c-4e54-99c3-8f1a19732a4e"></video>
        </div>
    );
}
