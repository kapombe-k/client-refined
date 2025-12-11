import { useAuthContext } from '../../contexts/authcontext';

const RoleGate = ({ roles, children, fallback = null }) => {
    const { user } = useAuthContext();

    if (!user || !roles) return fallback;

    // Check if user has any of the required roles
    const hasAccess = roles.some(role => user.role === role);

    return hasAccess ? children : fallback;
};

export default RoleGate;