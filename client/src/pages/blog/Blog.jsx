import React from "react";
import styles from "./blog.module.scss";
import classnames from "classnames/bind";
import DefaultLayout from "../../layout/DefaultLayout";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Grid } from "@mui/material";
import BlogCard from "../../components/BlogCard/BlogCard";
import blogs from "../../data/blogs";
function Blog() {
  const cx = classnames.bind(styles);
  return (
    <div className={cx("blog_page")}>
      <DefaultLayout>
        <div className={cx("container")}>
          <h3 className={cx("title")}>Blogs</h3>
          <Grid container spacing={4}>
            <Grid item xs={0} sm={0} md={3} className="pc">
              <Sidebar blog></Sidebar>
            </Grid>

            <Grid item xs={12} sm={12} md={9}>
              <Grid container spacing={6}>
                {blogs.map((blog) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                      <BlogCard blog={blog}></BlogCard>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Blog;
