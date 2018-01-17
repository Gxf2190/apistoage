import * as React from 'react';
import { connect } from 'dva';
import { Row, Col , Input, Select, notification, Icon } from 'antd';
import * as styles from './header.less';
const Search = Input.Search;
const InputGroup  = Input.Group;
const Option   = Select.Option ;
@(connect(({ login }: any) => ({ login })) as any)
export default class Header extends React.PureComponent<HomeProps, any> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    
  }
  componentWillReceiveProps(nextProps: HomeProps) {
    
  }
  openNotification = () => {
    notification.open({
      message: '接口格式不正确',
      description: '请仔细检查接口格式.',
      duration: 1,
      icon: <Icon type="close-circle" style={{ color: 'red' }} />,
    });
  }
  Serach = (url) =>
  {
      if(url !== '') {
        let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(!reg.test(url)) {
          this.openNotification();
        }
      }
  }
  render() {
    return (
       <div className={styles.header}>
          <Row type="flex" justify="start">
            <Col span={4}> 
              <h2 className={styles.apicolor}>在线接口管理工具</h2>
            </Col>
            <Col span={12}> 
              <Search placeholder="请输入API接口地址，格式为【协议】：//【主机名】：端口号(可选)" enterButton="Search" size="large"  onSearch={this.Serach}/>
            </Col>
          </Row>
       </div>
    );
  }
}

interface HomeProps {
  login?: any;
  dispatch?: any;
}
