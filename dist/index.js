"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@octokit/rest");
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
const fs = __importStar(require("fs"));
// https://docs.github.com/en/rest/reference/issues#list-repository-issues
// https://octokit.github.io/rest.js/v18
// https://github.com/DIYgod/RSSHub/blob/5ee16451dcd9abd2a1d5a9c7c8a3b905fc62e50c/lib/v2/github/issue.js
const octokit = new rest_1.Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = 'xiaotiandada';
const repo = 'blog';
const path = 'README.md';
const newCount = 5;
const DEV = false;
/**
 * push markdown
 * @param contents 文垱内容
 * @returns
 */
const push = async (contents, path) => {
    try {
        const { status, data: fileData } = await octokit.repos.getContent({
            owner,
            repo,
            path,
        });
        // console.log(fileData);
        if (status !== 200) {
            console.log('fail', status);
            return;
        }
        const contentsBase64 = Buffer.from(contents).toString('base64');
        const { status: createOrUpdateFileContentsStatus, data: createOrUpdateFileContentsStatusData, } = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: path,
            message: `Update ${Date.now()}`,
            content: contentsBase64,
            // @ts-ignore
            sha: fileData.sha,
        });
        console.log(createOrUpdateFileContentsStatus, path);
    }
    catch (e) {
        console.log('push fail, path: ', path);
    }
};
/**
 * save Issues Labels
 * @param labels
 * @returns
 */
const saveIssuesLabels = (labels) => {
    if (labels.length) {
        const labelArr = labels.map((item) => item.name);
        return labelArr.length ? `[${labelArr.join(' ,')}]` : '';
    }
    else {
        return '';
    }
};
/**
 * format date
 * @param date
 * @returns
 */
const formatDate = (date) => {
    return date_fns_1.format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};
/**
 * save Issues
 * [xxx](xxx) [ xx ]
 * @param item
 * @returns
 */
const saveIssues = (item, hasTime = false) => {
    const title = `[#${item.number} ${item.title}]`;
    const link = `(${item.html_url})`;
    const labels = saveIssuesLabels(item.labels);
    const date = hasTime ? ' ' + formatDate(item.updated_at) : '';
    return '- ' + title + link + ' ' + labels + date + '\n';
};
/**
 * generated Top Markdown
 * @param list
 * @returns
 */
const generatedTopMd = (list) => {
    const topResult = list.filter((item) => item.labels.find((label) => label.name === 'Top'));
    if (topResult.length) {
        let TopMd = `\n## Top\n`;
        topResult.forEach((item) => {
            TopMd += saveIssues(item);
        });
        return TopMd;
    }
    else {
        return '';
    }
};
/**
 * generated New Markdown
 * @param list
 * @returns
 */
const generatedNewMd = (list) => {
    const cloneDeepList = lodash_1.cloneDeep(list);
    // sort updated_at
    // slice
    const newResult = cloneDeepList
        .sort((a, b) => date_fns_1.compareAsc(new Date(b.updated_at), new Date(a.updated_at)))
        .slice(0, newCount);
    if (newResult.length) {
        let md = `\n## New\n`;
        newResult.forEach((item) => {
            md += saveIssues(item, true);
        });
        return md;
    }
    else {
        return '';
    }
};
/**
 * generated Article list Markdown
 * @param list
 * @returns
 */
const generatedArticleListMd = (list) => {
    if (list.length) {
        let md = `\n## Article list\n`;
        list.forEach((item) => {
            md += saveIssues(item);
        });
        return md;
    }
    else {
        return '';
    }
};
/**
 * process markdown
 * @param data issues list
 */
const processMd = ({ data }) => {
    // Head
    let headMd = `## Blog\nMy personal blog using issues and GitHub Actions\n`;
    // Top
    let TopMd = generatedTopMd(data);
    // New
    let newMd = generatedNewMd(data);
    // List
    let listMd = generatedArticleListMd(data);
    const result = headMd + TopMd + newMd + listMd;
    if (DEV) {
        try {
            const data = fs.writeFileSync('DEMO.md', result);
            //文件写入成功。
        }
        catch (err) {
            console.error(err);
        }
    }
    else {
        push(result, path);
    }
};
/**
 * get repo
 */
const getRepo = async () => {
    try {
        const { status, data } = await octokit.rest.repos.get({
            owner,
            repo,
        });
        if (status === 200) {
            // console.log('data', data)
            return data;
        }
        else {
            console.log('fail', status);
            return false;
        }
    }
    catch (e) {
        console.log('getRepo', e.toString());
        return false;
    }
};
/**
 * init issues
 */
const init = async () => {
    try {
        const respo = await getRepo();
        let count = respo.open_issues_count;
        let per_page = 100; // default 30 max 100
        let len = Math.floor(count / per_page) + 1;
        let list = [];
        for (let i = 1; i <= len; i++) {
            const { status, data } = await octokit.rest.issues.listForRepo({
                owner,
                repo,
                page: i,
                per_page: per_page,
            });
            if (status === 200) {
                // console.log('data', data)
                list.push(...data);
            }
            else {
                console.log('fail', status);
            }
        }
        processMd({ data: list });
    }
    catch (e) {
        console.log('fetch', e.toString());
    }
};
init();
