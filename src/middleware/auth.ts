import jwt from 'jsonwebtoken';
import config from 'config';

module.exports = async function(req: { header: (arg0: string) => any; user: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): void; new(): any; }; }; }, next: () => void) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        await jwt.verify(token, config.get('jwtSecret'), (error: any, decoded: any) => {
        if(error){
            res.status(401).json({ msg: 'Token is not valid' });
        }
        else{
            req.user = decoded.user;
            next();
        }
        });
    } catch (err) {
        console.error('something wrong with auth middleware')
        res.status(500).json({ msg: 'Server Error' });
    }
};
