import React, { useState } from "react";
import { Modal, Image, Spin } from "antd";
import type { ImageProps } from "antd";

interface ImageModalProps {
  visible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ visible, imageUrl, onClose }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad: ImageProps['onLoad'] = () => {
    setLoading(false);
  };

  const handleImageError: ImageProps['onError'] = () => {
    setLoading(false); // Stop loader even if image fails to load
  };

  return (
    <Modal
      open={visible}
      onCancel={() => {
        setLoading(true); // Reset for next time
        onClose();
      }}
      footer={null}
      centered
      width="auto"
      style={{
        height: "80vh"
      }}
    >
      <Spin spinning={loading} size="small">
        <Image
          src={imageUrl}
          alt="Preview"
          onLoad={handleImageLoad}
          onError={handleImageError}
          preview={false}
          style={{
            maxHeight: "80vh",
            maxWidth: "100%",
            objectFit: "contain",
            display: loading ? "none" : "inline-block",
          }}
        />
      </Spin>
    </Modal>
  );
};

export default ImageModal;
