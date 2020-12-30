import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';

const img = 'https://i.pinimg.com/originals/b4/e1/44/b4e14460aa1a347d0dd0ece458d84eef.jpg'

class Index extends React.Component {
  state = { open: false };
    render() {
      const emptyState = !store.get('ids');
      return (
      <Page>
        <TitleBar
        title="Joyful Art"
        primaryAction={{
          content: 'Select products',
        }}
      />
      <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ? (
        <Layout>
        <EmptyState
          heading="Discount your products temporarily"
          action={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
          image={img}
        >
          <p>Select products to change their price temporarily.</p>
        </EmptyState>
        </Layout>
       ) : (
        <ResourceListWithProducts />
    )}
      </Page>
    );
    }
    handleSelection = (resources) => {
      const idsFromResources = resources.selection.map((product) => product.id);
      this.setState({ open: false })
      store.set('ids', idsFromResources);
    };
  }
  
  export default Index;