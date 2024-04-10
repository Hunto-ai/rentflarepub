import { Modal, List, Button, Title, Text, Divider, FocusTrap } from '@mantine/core';
import classes from './UserAgreementModal.module.css';

interface UserAgreementModalProps {
  opened: boolean;
  onAccept(): void;
}

export default function UserAgreementModal({ opened, onAccept }: UserAgreementModalProps) {
  return (
    <>
<Modal
  opened={opened}
  onClose={() => {}}
  closeOnClickOutside={false}
  closeOnEscape={false}
  withCloseButton={false}
  trapFocus
  title="Software Customer Agreement"
  size="lg"
>
  <FocusTrap>
    <div className={classes.container}>
      <Title order={2} size="h4" className={classes.heading}>
        Definitions
      </Title>
      <Text size="md" className={classes.text}>
        &quot;Software&quot; means the Rentflare software platform that facilitates equipment
        rental pricebook creation, digital execution of rental lease agreements, monthly
        rent collection, and rental portfolio management.
      </Text>
      <Text size="md" className={classes.text}>
        &quot;Services&quot; means the advisory services and support provided by Rentflare
        in relation to the Software, including industry best practices on portfolio
        management.
      </Text>
      <Text size="md" className={classes.text}>
        &quot;End Users&quot; means the Client&apos;s customers who enter into rental
        agreements through the Software.
      </Text>
      <Text size="md" className={classes.text}>
        &quot;Confidential Information&quot; means any non-public information disclosed by
        one party to the other in connection with this Agreement, including but not limited
        to business plans, financial information, and customer data.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Services
      </Title>
      <Text size="md" className={classes.text}>
        Rentflare shall grant the Client access to the Software, which facilitates the
        following features:
      </Text>
      <List withPadding className={classes.list}>
        <List.Item className={classes.listItem}>Creation of rental pricebooks</List.Item>
        <List.Item className={classes.listItem}>
          Digital execution of contracts between the Client and their End Users, using
          partner services such as BoldSign
        </List.Item>
        <List.Item className={classes.listItem}>
          Automated monthly rent collection from End Users via the Stripe platform
        </List.Item>
        <List.Item className={classes.listItem}>Comprehensive rental
        portfolio management tools
        </List.Item>
      </List>
      <Text size="md" className={classes.text}>
        Rentflare will provide the Client with a template lease agreement for use with
        their End Users. The Client acknowledges that the lease agreement is solely between
        the Client and their End Users, and Rentflare shall not be a party to such
        agreements.
      </Text>
      <Text size="md" className={classes.text}>
        Rentflare will provide the Client with industry best practices on portfolio
        management as part of its advisory services.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Pricing and Payment
      </Title>
      <Text size="md" className={classes.text}>The Client agrees to pay Rentflare the following fees:</Text>
      <Text size="md" className={classes.text}>
        Contract Execution Fee: $79.99 per contract execution, charged to the Client&apos;s
        credit card on file at the time of transaction.
      </Text>
      <Text size="md" className={classes.text}>
        Monthly Transaction Fee: 4% of monthly transaction fees, plus applicable Stripe processing
        fees, deducted from monthly rental collections before payment is sent to the
        Client.
      </Text>
      <Text size="md" className={classes.text}>
        Rentflare will process monthly rent payments from End Users and provide payment to
        the Client, less the applicable transaction fees, via the Stripe platform.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Data Privacy and Compliance
      </Title>
      <Text size="md" className={classes.text}>
        Rentflare shall comply with all applicable data privacy laws and regulations,
        including the Personal Information Protection and Electronic Documents Act
        (PIPEDA).
      </Text>
      <Text size="md" className={classes.text}>
        Rentflare shall implement appropriate technical and organizational measures to
        protect the security and confidentiality of the Client&apos;s data, including
        encryption, access controls, and regular backups.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Limitation of Liability
      </Title>
      <Text size="md" className={classes.text}>
        Rentflare provides the template lease agreement as a sample only and shall not be
        liable for any failure of the agreement in a court of law. The Client is solely
        responsible for ensuring the lease agreement meets their specific needs and
        complies with applicable laws.
      </Text>
      <Text size="md" className={classes.text}>
        Rentflare shall not be liable for any End User&apos;s failure to make payments under
        their rental agreements or for the collection of missed payments. The Client is
        solely responsible for collecting payments from their End Users.
      </Text>
      <Text size="md" className={classes.text}>
        In no event shall Rentflare be liable for any indirect, incidental, special, or
        consequential damages arising out of or in connection with this Agreement, even if
        advised of the possibility of such damages.
      </Text>
      <Text size="md" className={classes.text}>
        Rentflare&apos;s total liability under this Agreement shall not exceed the fees paid by
        the Client in the twelve months preceding the claim.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Confidentiality
      </Title>
      <Text size="md" className={classes.text}>
        Each party acknowledges that in the course of performing its duties under this
        Agreement, it may receive Confidential Information from the other party.
      </Text>
      <Text size="md" className={classes.text}>
        Each party agrees to maintain the confidentiality of such information and not
        disclose it to any third party without the prior written consent of the other party
        for a period of 3 years past termination of this Agreement.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Indemnification
      </Title>
      <Text size="md" className={classes.text}>
        Each party shall indemnify, defend, and hold harmless the other party from and
        against any and all claims, damages, liabilities, costs, and expenses arising out
        of or in connection with their breach of this Agreement or gross negligence.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Updates and Modifications
      </Title>
      <Text size="md" className={classes.text}>
        Rentflare reserves the right to update and modify the Software from time to time.
      </Text>
      <Text size="md" className={classes.text}>
        Rentflare shall provide the Client with reasonable notice of any material changes
        to the Software, including release notes or documentation for any significant
        updates.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Compliance with Laws
      </Title>
      <Text size="md" className={classes.text}>
        Each party shall comply with all applicable laws and regulations in their use of
        the Software and performance of this Agreement.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Assignability
      </Title>
      <Text size="md" className={classes.text}>
        Neither party may assign its rights or obligations under this Agreement without the
        prior written consent of the other party, except that Rentflare may assign this
        Agreement to a successor in interest upon written notice to the Client.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Governing Law and Dispute Resolution
      </Title>
      <Text size="md" className={classes.text}>
        This Agreement is governed by the laws of Saskatchewan, Canada.
      </Text>
      <Text size="md" className={classes.text}>
        Any disputes arising out of or in connection with this Agreement shall be resolved
        through mediation or arbitration before initiating legal action.
      </Text>
      <Divider my="md" className={classes.divider} />
      <Title order={2} className={classes.heading}>
        Entire Agreement
      </Title>
      <Text size="md" className={classes.text}>
        This Agreement constitutes the entire agreement between the parties with respect to
        the subject matter hereof and supersedes all prior and contemporaneous agreements,
        representations, and understandings of the parties.
      </Text>
      <Text mt="md" size="md" className={classes.text}>
        By clicking &quot;I accept&quot; below, you acknowledge that you have
        the authority to bind your company to this agreement, have read,
        understood, and agree to be bound by the terms of this Agreement.
      </Text>
      <Button mt="md" onClick={onAccept}>
        I Accept
      </Button>
    </div>
  </FocusTrap>
</Modal>
    </>
  );
}
