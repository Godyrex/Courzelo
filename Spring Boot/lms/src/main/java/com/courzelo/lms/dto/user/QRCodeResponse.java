package com.courzelo.lms.dto.user;

import lombok.Data;

@Data
public class QRCodeResponse {
    private String qrCodeImage;

    public QRCodeResponse(String qrCodeImage) {
        this.qrCodeImage = qrCodeImage;
    }
}
