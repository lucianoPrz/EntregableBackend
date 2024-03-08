import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    req.logger.debug('test debug')
    req.logger.http('test http')
    req.logger.info('test info')
    req.logger.warning('test warning')
    req.logger.error('test error')
    req.logger.fatal('test fatal')
    res.send('Test logger')
})

export { router as loggerTestRouter }