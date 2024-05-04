import { __awaiter, __generator } from "tslib";
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api-authorization/authorizeService';
import { ClaimKeys, Roles } from '../api-authorization/apiAuthorizationConstants';
var AuthContext = createContext(null);
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useState(null), user = _b[0], setUser = _b[1];
    useEffect(function () {
        var checkUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authService.getUser()];
                    case 1:
                        currentUser = _a.sent();
                        if (currentUser && currentUser[ClaimKeys.Role]) {
                            currentUser.isAdmin = currentUser && currentUser[ClaimKeys.Role].includes(Roles.ClinicAdmin);
                        }
                        setUser(currentUser);
                        return [2 /*return*/];
                }
            });
        }); };
        checkUser();
    }, []);
    return (React.createElement(AuthContext.Provider, { value: { user: user } }, children));
};
export var useAuth = function () {
    var context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
//# sourceMappingURL=authContext.js.map