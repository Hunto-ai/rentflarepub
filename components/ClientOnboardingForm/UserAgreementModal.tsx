import { Modal, List, Button, Title, Container, Paper, Text, FocusTrap, Checkbox } from '@mantine/core';
import { useState } from 'react';
import classes from './UserAgreementModal.module.css';

interface UserAgreementModalProps {
  opened: boolean;
  onAccept(): void;
}

export default function UserAgreementModal({ opened, onAccept }: UserAgreementModalProps) {
  const [checked, setChecked] = useState(false);

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
        &quot;Client&quot; means the party entering into this Agreement with Rentflare to use
        the Software and Services.
      </Text>
      <Text size="md" className={classes.text}>
        &quot;Rentflare&quot; means Rentflare Software Services, a
        Canadian corporation with its principal
        place of business at 2375 College Ave, Regina, SK, Canada.
      </Text>
      <Text size="md" className={classes.text}>
        &quot;Agreement&quot; means this Software Customer Agreement between the Client and
        Rentflare.
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
      <Title order={2} className={classes.heading}>
        Indemnification
      </Title>
      <Text size="md" className={classes.text}>
        Each party shall indemnify, defend, and hold harmless the other party from and
        against any and all claims, damages, liabilities, costs, and expenses arising out
        of or in connection with their breach of this Agreement or gross negligence.
      </Text>
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
      <Title order={2} className={classes.heading}>
        Compliance with Laws
      </Title>
      <Text size="md" className={classes.text}>
        Each party shall comply with all applicable laws and regulations in their use of
        the Software and performance of this Agreement.
      </Text>
      <Title order={2} className={classes.heading}>
        Intellectual Property
      </Title>
      <Text size="md" className={classes.text}>
      Rentflare retains all intellectual property rights in the Software.
       The Client is granted a limited, non-exclusive, non-transferable license
       to use the Software solely for their internal business purposes and
       in accordance with this Agreement.
      </Text>
      <Title order={2} className={classes.heading}>
        Termination
      </Title>
      <Text size="md" className={classes.text}>
      Either party may terminate this Agreement upon 60 days&apos;
      written notice to the other party. Upon termination, the
      Client shall immediately cease all use of the Software and
      return or destroy all Confidential Information in its
      possession. Any fees owed to Rentflare prior to termination shall remain payable.
      </Text>
      <Title order={2} className={classes.heading}>
        Warranty Disclaimer
      </Title>
      <Text size="md" className={classes.text}>
        The Software is provided &quot;as is&quot; and &quot;as available&quot; without
        warranty of any kind, express or implied, including but not limited to the
        warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </Text>
      <Text size="md" className={classes.text}>
        Rentflare does not warrant that the Software will be error-free or that access to
        the Software will be uninterrupted.
      </Text>
      <Title order={2} className={classes.heading}>
        Limitation of Use
      </Title>
      <Text size="md" className={classes.text}>
        The Client shall not use the Software for any illegal or unauthorized purpose.
      </Text>
      <Text size="md" className={classes.text}>
        The Client shall not use the Software to transmit any viruses, worms, or other
        malicious code. Rentflare reserves the right to suspend or terminate the Client&apos;s
        access to the Software for any violation of this Agreement.
      </Text>
      <Title order={2} className={classes.heading}>
        Data Ownership
      </Title>
      <Text size="md" className={classes.text}>
        The Client retains ownership of all data entered into the Software, including
        customer data and rental agreements. Rentflare shall not use or disclose such data
        except as necessary to provide the Services or as required by law. Rentflare may
        use anonymized and aggregated data for research and development purposes. Rentflare
        shall not sell or share the Client&apos;s data with third parties for marketing purposes.
      </Text>
      <Title order={2} className={classes.heading}>
        Relationship of Parties
      </Title>
      <Text size="md" className={classes.text}>
        The parties are independent contractors and nothing in this Agreement shall be
        construed as creating a partnership, joint venture, or agency relationship between
        the parties.  Neither party has the authority to bind the other party or to incur
        any obligation on its behalf. The parties shall be responsible for their own taxes
        and benefits. The Client acknowledges that Rentflare is not a party to the lease agreements
        between the Client and their End Users.
      </Text>
      <Title order={2} className={classes.heading}>
        Data Retention and Deletion
      </Title>
      <Text size="md" className={classes.text}>
        Rentflare shall retain the Client&apos;s data for the duration of this Agreement and
        for a period of 90 days following termination. After 90 days, Rentflare shall
        permanently delete the Client&apos;s data from its systems. The Client may request
        earlier deletion of their data by contacting Rentflare support. Rentflare shall not
        be responsible for any data loss resulting from the Client&apos;s failure to export
        their data prior to termination.
      </Text>
      <Title order={2} className={classes.heading}>
        CASL Compliance
      </Title>
      <Text size="md" className={classes.text}>
        Rentflare shall comply with the Canadian Anti-Spam Legislation (CASL) in its
        communications with the Client, including obtaining the Client&apos;s express consent
        to receive electronic messages. The Client may unsubscribe from Rentflare&apos;s
        communications at any time by contacting Rentflare support.  Rentflare shall not
        share the Client&apos;s contact information with third parties for marketing purposes.
      </Text>
      <Title order={2} className={classes.heading}>
        Notices
      </Title>
      <Text size="md" className={classes.text}>
        All notices required or permitted under this Agreement shall be in writing and
        delivered by email to the parties&apos; respective email addresses on file.
      </Text>
      <Title order={2} className={classes.heading}>
        Assignability
      </Title>
      <Text size="md" className={classes.text}>
        Neither party may assign its rights or obligations under this Agreement without the
        prior written consent of the other party, except that Rentflare may assign this
        Agreement to a successor in interest upon written notice to the Client.
      </Text>
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
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="
            I am an officer or authorized representative of the Client and have the authority
            to bind the Client to this Agreement."
      />
          <Button mt="md" disabled={!checked} onClick={onAccept}>
            I Accept
          </Button>
    </div>
  </FocusTrap>
</Modal>
    </>
  );
}
