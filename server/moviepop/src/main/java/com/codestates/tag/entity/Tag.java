package com.codestates.tag.entity;

import com.codestates.reviewBoard.entity.ReviewBoardTag;
import com.codestates.user.entity.UserTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    private String tagName;

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return Objects.equals(tagName, tag.tagName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagName);
    }

//    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
//    private ReviewBoardTag reviewBoardTag;
//
//    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
//    private UserTag userTag;
}
