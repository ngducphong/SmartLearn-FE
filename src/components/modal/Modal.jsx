import React, { useState } from "react";
import { Modal } from "antd";

export default function MyModal({ isOpen, onOk, onCancel, description }) {
  return (
    <Modal
      title="Mô tả"
      open={isOpen}
      onCancel={onCancel}
      width={800}
      style={{ height: "fit-content" }}
      footer={null}
    >
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Modal>
  );
}
