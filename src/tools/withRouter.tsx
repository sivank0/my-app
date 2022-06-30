import { useNavigate, useParams } from 'react-router-dom';

export const withRouter = <TProps,>(Component: any) => {
    const Wrapper = (props: TProps): JSX.Element => {

      const navigate = useNavigate();
      const params = useParams();

      return (
        <Component {...props} navigate={navigate} params={params}/>
      );
    };
    
    return Wrapper;
  };