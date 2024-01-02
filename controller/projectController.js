
const projects = require('../model/projectSchema');

exports.addProject = async (req, res) => {
    console.log('inside the project controller');

    const userId = req.payload
    console.log(userId);

    const projectImage = req.file.filename
    console.log('projectImage=', projectImage);

    const { title, language, github, website, overview } = req.body
    console.log(`${title},${language},${github},${website},${overview},${projectImage},${userId}`);


    try {
        const existingWebsite = await projects.findOne({ website })
        if (existingWebsite) {
            res.status(406).json('Project Already exist....  Please add New Project')
        } else {
            //create an object from the model
            const newProjects = new projects({
                title: title,
                language: language,
                github,
                website,
                overview,
                projectImage,
                userId
            })
            //save function in mongoose - to permanently store this data in mongodb
            await newProjects.save()
            //response
            res.status(200).json(newProjects)

        }
    }
    catch (err) {
        res.status(401).json(`Request failed due to :${err}`)
    }



}
//------------home project ------------------//

exports.getHomeProjects = async (req, res) => {

    try {
        const homeResult = await projects.find().limit(3)
        res.status(200).json(homeResult)
    }
    catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }

}

//-------------get all project -----------------//
exports.getAllProject = async (req, res) => {
    //search
    const searchkeys = req.query.search
    console.log('searchkey=', searchkeys);

    const querys = {
        language: {
            //regex => regular expression
            //options => remove case sensitivity
            $regex: searchkeys, $options: 'i'
        }
    }
    

    try {
        const allProjectResult = await projects.find(querys)
        res.status(200).json(allProjectResult)
    } catch (err) {
        res.status(401).json(`Request failed due to:${err}`)
    }

}
//---------------user Project --------------------//

exports.userProject = async (req, res) => {
    const userId = req.payload
    console.log(userId);

    try {

        const userProjectResult = await projects.find({ userId })
        res.status(200).json(userProjectResult)
    }
    catch (err) {
        res.status(406).json(`Request failed due to ${err}`)

    }
}

//--------------edit project------------//
exports.editProject = async (req, res) => {
    const { id } = req.params
    console.log(id);

    const userId = req.payload
    const { title, language, github, website, overview, projectImage } = req.body
    const updatedImage = req.file ? req.file.filename : projectImage
    console.log("updatedImage",updatedImage);

    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: id }, { title, language, github, website, overview, projectImage: updatedImage, userId }, { new: true })
        await updateProject.save()
        res.status(200).json(updateProject)


    }
    catch (err) {
        res.status(401).json(err)
    }

}
//--------------delete project----------------//
exports.deleteproject = async (req,res)=>{
    const {id} = req.params
    console.log('delete id=',id);
    try{
        const deleteprojects = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteprojects)

    }
    catch(err){
        res.status(401).json(err)
    }

}