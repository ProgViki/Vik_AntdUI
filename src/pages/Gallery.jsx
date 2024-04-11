import { Image, Typography, Input, List, Card, Space } from 'antd'
import React, { useState, useEffect } from 'react'

const Gallery = () => {
    const [searchText, setSearchText] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewImages, setPreviewImages  ] = useState([]);


    useEffect(() => {
        setLoading(true);
        // API
        fetch(`https://dummyjson.com/products/search?q=${searchText}`)
        .then(res => res.json())
        .then(response =>{
            setLoading(false);
            setDataSource(response.products)
        });
    }, [searchText]);
  return (
    
   <Space style={{ padding: "0px 16px"}} direction="vertical" >
   <Typography.Title
    style={{textAlign: "center", fontFamily: "monospace"}}>
        Viki's Gallery
    </Typography.Title>
    <Input.Search style={{maxWidth: 500, display: "flex", margin: 10}}
    onSearch={(value) =>{
        setSearchText((value))
    }}>
    </Input.Search>  
    <Typography.Text >
        Showing results for: <Typography.Text>{searchText || "All"} </Typography.Text> 
    </Typography.Text>
    <List loading={loading}
         dataSource={dataSource}

        grid = {{xs:1, sm:2, md:3, lg:4, xl:5, xxl:6}}
        renderItem={(item) => {
        return <Card 
        hoverable
        key={item.id}
        style={{height: 300, margin: 12, overflow: "hidden"}}
        >
            <Image src={item.thumbnail} preview={{visible: false}}
             onClick={() => setPreviewImages(item.images)}   />
        </Card>
    }}
    ></List>
    {previewImages.length > 0 ? (
    <Image.PreviewGroup
        preview={{
            visible: previewImages.length,
            onVisibleChange: (value) => {
                if (!value) {
                    setPreviewImages([]);
                }
            },
        }}
       >
        { previewImages.map((images) =>{
            return <Image src={image} />;
        })}
    </Image.PreviewGroup>) : null
    }
   </Space>
  )
}

export default Gallery
