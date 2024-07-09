

import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../helpers/user.helper';

export const authenticateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Access token is missing' });
    }

    // Split the authorization header to extract the token
    const token = authorizationHeader.split(' ')[1];

    try {
        const user = await verifyAccessToken(token);
        if (user) { 
            next();
        }
        if(!user){
            
        }
    } catch (error) {
        return res.status(403).json({  });
    }
};


// export const authenticateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
//     const refreshToken = req.headers['refresh-token'];

//     if (!refreshToken) {
//         return res.status(401).json({ error: 'Refresh token is missing' });
//     }

//     try {
//         const { user } = await verifyRefreshToken(refreshToken);
//         req.user = user; // Attach user object to the request for further processing
//         next();
//     } catch (error) {
//         return res.status(403).json({ error: error.message });
//     }
// };
