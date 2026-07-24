import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
} from "@react-email/components";


export default function OrderUpdate({
  customerName,
  orderNumber,
  title,
  message,
}: {
  customerName: string;
  orderNumber: string;
  title: string;
  message: string;
}) {

  return (
    <Html>

      <Head />

      <Body
        style={{
          backgroundColor: "#f4f1ea",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >

        <Container
          style={{
            backgroundColor:"#ffffff",
            padding:"40px",
            borderRadius:"24px",
            maxWidth:"560px",
          }}
        >

          <Text
            style={{
              letterSpacing:"4px",
              fontSize:"12px",
              color:"#777",
              textTransform:"uppercase",
            }}
          >
            Salt & Swell
          </Text>


          <Heading
            style={{
              fontSize:"32px",
              marginTop:"20px",
              color:"#171715",
            }}
          >
            {title}
          </Heading>


          <Text
            style={{
              fontSize:"16px",
              lineHeight:"28px",
              color:"#444",
            }}
          >
            Hi {customerName},
          </Text>


          <Text
            style={{
              fontSize:"16px",
              lineHeight:"28px",
              color:"#444",
            }}
          >
            {message}
          </Text>


          <Section
            style={{
              marginTop:"30px",
              padding:"20px",
              background:"#f5f3ee",
              borderRadius:"16px",
            }}
          >

            <Text>
              Order #{orderNumber}
            </Text>

          </Section>


          <Button
            href="https://saltandswell.com.au/account/orders"
            style={{
              marginTop:"30px",
              background:"#182321",
              color:"#ffffff",
              padding:"16px 28px",
              borderRadius:"999px",
              fontWeight:"600",
            }}
          >
            View Your Journey
          </Button>


          <Hr style={{margin:"40px 0"}} />


          <Text
            style={{
              fontSize:"13px",
              color:"#777",
            }}
          >
            Designed on the Australian coast.
            <br />
            Built for salty souls.
          </Text>


        </Container>

      </Body>

    </Html>
  );
}
