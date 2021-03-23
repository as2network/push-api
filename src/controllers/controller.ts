/** 
 * @file Controller
 * @summary EDI Transaction Shipment push controller
 */
import {RequestHandler} from 'express';
import webpush from 'web-push';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

interface IEDI {
    id: string,
    bol: string,
    location: string,
    rawLocationLat: number,
    rawLocationLong: number,
    rawLocationAlt: number,
    pdf: string
}
type EDItxTypes = {
    [prop: string]: IEDI
}
interface IShipments {
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    }
}


let editx: EDItxTypes = {}
const addInEDI = (fields: formidable.Fields, files: formidable.Files): IEDI => {
    editx[fields.id as string] = {
        id: <string>fields.id , 
        location: <string>fields.location,
        pdf: `/public/${files.file.name}`,
        rawLocationLat: Number.parseFloat(fields.rawLocationLat as string),
        rawLocationLong: Number.parseFloat(fields.rawLocationLong as string),
        rawLocationAlt: Number.parseFloat(fields.rawLocationAlt as string),
        bol: <string>fields.bol
    };
    return editx[fields.id as string];
}

const Shipments: IShipments[] = [];

export const getEDItx: RequestHandler = (req, resp, next) => {
    
    resp.status(200).json(editx);
}

export const addEDI: RequestHandler = (req, resp, next) => {

    const formData = new formidable.IncomingForm();
    formData.parse(req, (err, fields: formidable.Fields, files: formidable.Files) => {

        const newPath: string = path.join(__dirname, '..', 'public', files.file.name);
        let edi:IEDI;
        fs.promises.copyFile(files.file.path, newPath)
            .then(() => {
                edi = addInEDI(fields, files);
            })
            // Enviar web push notification
            .then(() => {
                const privateKey = process.env.WEB_PUSH_PRIVATE_KEY as string;
                const publicKey = process.env.WEB_PUSH_PUBLIC_KEY as string;

                webpush.setVapidDetails('https://pki.as2.network', publicKey, privateKey);
                //return admin.database().ref('Shipments').once('value')
                return Shipments;
            })
            .then(subs => {
                subs.forEach(sub => {
                    const pushConfig: webpush.PushShipments = {
                        endpoint: sub.endpoint,
                        keys: {
                            auth: sub.keys.auth,
                            p256dh: sub.keys.p256dh
                        }
                    }
                    webpush.sendNotification(pushConfig, JSON.stringify({bol: 'New EDI', content: edi.bol, openUrl: '/help'}))
                    .catch(err => {
                        console.log(err);
                    })
                });
                console.log(edi);
                resp.status(201).json({message: 'Data stored', id: edi.id});
            })
            .catch(err => {
                console.log(err);
            })
    })
}

export const createShipments: RequestHandler = (request, resp, next) => {
    const subscription = request.body as IShipments;

    Shipments.push(subscription);
    resp.status(201).json({});
}