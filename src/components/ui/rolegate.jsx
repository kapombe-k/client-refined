import { useAuth } from '../../hooks/useauth';

const RoleGate = ({ roles, children, fallback = null }) => {
    const { hasRole } = useAuth();
    return hasRole(roles) ? children : fallback;
};

export default RoleGate;