import { connect } from 'react-redux';
import WorkshopDetails from '../../../components/pages/WokshopDetails';

const mapStateToProps = ( state ) => {
    return {
        theme: state.themeState.theme
    };
};

export default connect( mapStateToProps, null )( WorkshopDetails );