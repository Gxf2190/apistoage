import * as React from 'react';
import { connect } from 'dva';
import { Input,Avatar} from 'antd';
import * as styles from './header.less'

@(connect(({ login }: any) => ({ login })) as any)
export default class Header extends React.PureComponent<HomeProps, any> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }


  public componentDidMount() {
    
  }

  public componentWillReceiveProps(nextProps: HomeProps) {
  
  }

  public render() {
    return (
       <div>
            <Avatar 
                size="large"
                icon="user"
                 />
            <Input.Search
            placeholder="input search api "
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
            />
       </div>
    );
  }
}

interface HomeProps {
  login?: any;
  dispatch?: any;
}
