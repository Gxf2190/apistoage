import * as React from 'react';
import { connect } from 'dva';
import * as styles from './Home.less';
import { Layout } from 'antd';
import Header from './header/header';
@(connect(({ login }: any) => ({ login })) as any)
export default class Home extends React.PureComponent<HomeProps, any> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  public checkLogin(props: HomeProps) {
    if (!props.login || !props.login.hasLogin) {
      // props.dispatch(push({pathname: '/login'}));
    }
  }

  public componentDidMount() {
    this.checkLogin(this.props);
  }

  public componentWillReceiveProps(nextProps: HomeProps) {
    this.checkLogin(nextProps);
  }

  public render() {
    return (
      <Layout className={styles.wrapper}>
        <Layout.Header className={styles.header}>
          <Header/>
        </Layout.Header>
     
        
      </Layout>
    );
  }
}

interface HomeProps {
  login?: any;
  dispatch?: any;
}
