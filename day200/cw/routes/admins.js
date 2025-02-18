const adminRouter = expressRouter();

const Router = expressRouter();


App.get('/', (req,res) => {
    res.json({message: 'admin'})
});

app.post('/add', (req,res) =>{
    res.json({message: 'admin added'})
})

export default adminRouter;