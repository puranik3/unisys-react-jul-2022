import { connect } from 'react-redux';
import Menu from '../../components/Menu';
import { toggleTheme } from '../../actions/creators';

const mapStateToProps = ( state ) => {
    return {
        theme: state.themeState.theme
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        toggleTheme() {
            dispatch( toggleTheme() );
        }
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Menu );