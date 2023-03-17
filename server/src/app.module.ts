import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
/*import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";*/
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    /*imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.oeudk.mongodb.net/music-platform?retryWrites=true&w=majority'),
        TrackModule,
        FileModule
    ]*/
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.cjsxvgj.mongodb.net/?retryWrites=true&w=majority'),
        TrackModule
    ]
})
export class AppModule {}