import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import nodemailer from "nodemailer";

// Create SMTP transporter with SSL fix
const transporter = nodemailer.createTransport({
  host: "smtp.zeptomail.com",
  port: 587,
  secure: false, // false for STARTTLS
  auth: {
    user: process.env.ZEPTOMAIL_USER,
    pass: process.env.ZEPTOMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Bypass SSL certificate issues
    ciphers: "SSLv3",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, name, whatsappNumber, referralSource } = await request.json();

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    // Clean WhatsApp number (remove spaces, keep + and digits)
    const cleanedWhatsappNumber = whatsappNumber 
      ? whatsappNumber.replace(/[^\d+]/g, '').trim() 
      : null;

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert([
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          whatsapp_number: cleanedWhatsappNumber,
          referral_source: referralSource || "website",
        },
      ])
      .select();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You are already on the waitlist!" },
          { status: 409 }
        );
      }

      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      console.log("Attempting to send email to:", email);

const info = await transporter.sendMail({
  from: '"BIDORO" <hello@bidoro.africa>',
  to: email,
  subject: "Welcome to the Bidoro Waitlist! 🚀",
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Bidoro</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 2px solid #1C341A; border-radius: 20px;  line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 0; background-color: #f1f6faff;">
        
        <!-- Header with Logo -->
        <div style="text-align: center; padding: 40px 20px; border-radius: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); margin: 0;">
          <!-- Your Logo -->
          <img src="https://blogger.googleusercontent.com/img/a/AVvXsEhujOGbWy47k29NCS2fQ5HLpAVigulEi5U_2rdnwVvq0lPEXtcb8L1q__7raTtq-K-RT9XWzaCXpuwV_8ENa-2FXsgPWUUdEE4WHHFCnc86S2cZAvJaAQL3UOUKxDCMc831PtTWtn3tLg2z4pk4PQtiSxAdERuskZvdRpkPgxnylwgJVO8T4t8UXmCUp0o" 
               alt="BIDORO Logo" 
               style="width: 200px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;"
               onerror="this.style.display='none'">
          
          <h1 style="color: #1C341A; margin: 0; font-size: 36px; font-weight: bold;">
            Welcome to <span style="color: #FFD700;">BIDORO</span>
          </h1>
          <p style="color: #1C341A; margin: 15px 0 0 0; font-size: 18px;">
            You're officially on the waitlist! 🎉
          </p>
        </div>

        <!-- Main Content Card -->
        <div style="background: white; margin: 0; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
          
          <!-- Personal Greeting -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1C341A; margin: 0; font-size: 28px;">
              Hi${name ? ` ${name}` : ''}! 👋
            </h2>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">
              Thank you for joining our exclusive waitlist
            </p>
          </div>

          <!-- Welcome Message -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #DEE563;">
            <p style="font-size: 16px; margin: 0; color: #333; line-height: 1.6;">
              🌟 <strong>Congratulations!</strong> You're now part of an exclusive group that will get early access to the future of online marketplace. We're building something special, and you'll be among the first to experience it.
            </p>
          </div>

          <!-- WhatsApp Notice (if provided) -->
          ${cleanedWhatsappNumber ? `
          <div style="background: #25D366; padding: 15px 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; color: white; font-size: 14px;">
              📱 We'll also send you updates on WhatsApp at <strong>${cleanedWhatsappNumber}</strong>
            </p>
          </div>
          ` : ''}

          <!-- Benefits Section -->
          <div style="margin: 35px 0;">
            <h3 style="color: #1C341A; margin: 0 0 20px 0; font-size: 22px; text-align: center;">
              🎁 What You Get As a Waitlist Member
            </h3>
            
            <div style="display: table; width: 100%; border-spacing: 0;">
              <!-- Benefit 1 -->
              <div style="display: table-row;">
                <div style="display: table-cell; padding: 12px 15px; background: #f8f9fa; border-radius: 8px; margin-bottom: 10px; width: 100%;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-size: 24px; margin-right: 15px;">🚀</span>
                    <div>
                      <strong style="color: #1C341A; font-size: 16px;">VIP Early Access</strong>
                      <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Be the first to use Bidoro when we launch</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Benefit 2 -->
              <div style="display: table-row;">
                <div style="display: table-cell; padding: 12px 15px; background: #f8f9fa; border-radius: 8px; margin-bottom: 10px; width: 100%; margin-top: 10px;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-size: 24px; margin-right: 15px;">💰</span>
                    <div>
                      <strong style="color: #1C341A; font-size: 16px;">Exclusive Launch Discounts</strong>
                      <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Special pricing only for waitlist members</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Benefit 3 -->
              <div style="display: table-row;">
                <div style="display: table-cell; padding: 12px 15px; background: #f8f9fa; border-radius: 8px; margin-bottom: 10px; width: 100%; margin-top: 10px;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-size: 24px; margin-right: 15px;">🎯</span>
                    <div>
                      <strong style="color: #1C341A; font-size: 16px;">Insider Updates</strong>
                      <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Behind-the-scenes progress and launch updates</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Benefit 4 -->
              <div style="display: table-row;">
                <div style="display: table-cell; padding: 12px 15px; background: #f8f9fa; border-radius: 8px; width: 100%; margin-top: 10px;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-size: 24px; margin-right: 15px;">🎁</span>
                    <div>
                      <strong style="color: #1C341A; font-size: 16px;">Beta Features Access</strong>
                      <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Test new features before public release</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://bidoro.africa" 
               style="display: inline-block; background: linear-gradient(135deg, #1C341A 0%, #DEE563 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(28, 52, 26, 0.3); transition: all 0.3s ease;">
              🌐 Visit Our Website
            </a>
          </div>

          <!-- Social Proof -->
          <div style="text-align: center; margin: 35px 0; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              🔥 <strong>Join thousands</strong> of early adopters waiting for the next big thing in e-commerce
            </p>
          </div>

          <!-- Personal Touch -->
          <div style="border-top: 2px solid #DEE563; padding-top: 25px; margin-top: 35px;">
            <p style="font-size: 16px; color: #333; margin: 0 0 15px 0; line-height: 1.6;">
              We're working around the clock to create something amazing. Thank you for believing in our vision!
            </p>
            <p style="font-size: 16px; color: #1C341A; margin: 0; font-weight: 600;">
              — The BIDORO Team 💚
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 30px 20px; background: #f8f9fa; color: #666;">
          <p style="margin: 0 0 10px 0; font-size: 14px;">
            Questions? Simply reply to this email - we'd love to hear from you!
          </p>
          <p style="margin: 0 0 15px 0; font-size: 14px;">
            <a href="mailto:hello@bidoro.africa" style="color: #1C341A; text-decoration: none; font-weight: 600;">hello@bidoro.africa</a>
          </p>
          <p style="margin: 0; font-size: 12px; color: #999;">
            © 2025 BIDORO. All rights reserved.
          </p>
        </div>

      </body>
    </html>
  `,
});

      console.log("Email sent successfully:", info.messageId);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json(
      {
        message:
          "Successfully joined waitlist! Check your email for confirmation.",
        data: data[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}