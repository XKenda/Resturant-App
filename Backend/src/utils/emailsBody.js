

export const emailVerifictionBody = (code) => {
    return (
        `
<body style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f5;
    font-family: Arial, Helvetica, sans-serif;
">

    <div style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
    ">

        <!-- Header -->
        <div style="
            padding: 24px;
            background-color: #111827;
            text-align: center;
        ">
            <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
            ">
                Restaurant App
            </h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 32px;">

            <h2 style="
                margin-top: 0;
                color: #111827;
                font-size: 22px;
            ">
                Verify your email address
            </h2>

            <p style="
                color: #4b5563;
                font-size: 16px;
                line-height: 1.6;
            ">
                Welcome to Restaurant App!
                Please verify your email address to activate your account
                and start using our services.
            </p>

            <!-- Button -->
            <div style="
                text-align: center;
                margin: 32px 0;
                font-size: 20px
            ">
                <strong><span>Your code: </span> ${code}</strong>
            </div>

            <p style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
            ">
                This verification Code will expire in
                <strong>15 minutes</strong>.
            </p>

            <p style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
            ">
                If you didn't create an account, you can safely ignore this email.
            </p>

        </div>

        <!-- Footer -->
        <div style="
            padding: 20px;
            background-color: #f9fafb;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        ">
            <p style="
                margin: 0;
                color: #9ca3af;
                font-size: 12px;
            ">
                © 2026 Restaurant App. All rights reserved.
            </p>
        </div>

    </div>

</body>
</html>
`
    )
}